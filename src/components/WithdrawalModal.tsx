import { useState, useEffect } from 'react';
import { 
  X, 
  Wallet, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Building2,
  ShieldCheck
} from 'lucide-react';
import Button from './Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export default function WithdrawalModal({ isOpen, onClose, balance }: WithdrawalModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isSavingBank, setIsSavingBank] = useState(false);
  const [newBank, setNewBank] = useState({ bankName: 'BCA', accountNumber: '', accountName: '' });
  
  const { user } = useAuth();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [error, setError] = useState<string>('');

  const minWithdrawal = 10000;

  // Auto dismiss error toast
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Load bank from Supabase on mount
  useEffect(() => {
    if (isOpen && user) {
      setStep('form');
      setAmount(balance.toString());
      setError('');
      
      const fetchBankDetails = async () => {
        try {
          const { data, error } = await supabase
            .from('nomor_rekening')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (!error && data) {
             setBankAccount({
               bankName: data.bank_name || '',
               accountNumber: data.account_number || '',
               accountName: data.account_name || ''
             });
             setNewBank({
               bankName: data.bank_name || 'BCA',
               accountNumber: data.account_number || '',
               accountName: data.account_name || ''
             });
             if (data.bank_name && data.account_number) {
               setIsAddingBank(false);
             } else {
               setIsAddingBank(true);
             }
          } else {
             setIsAddingBank(true);
          }
        } catch (err) {
          console.error("Failed to load bank setup:", err);
          setIsAddingBank(true);
        }
      };

      fetchBankDetails();
    }
  }, [isOpen, balance, user]);

  const handleSaveBank = async () => {
    if (!newBank.accountNumber || !newBank.accountName) {
      setError('Harap lengkapi detail rekening.');
      return;
    }
    if (!user) {
      setError('Sesi tidak valid.');
      return;
    }

    setIsSavingBank(true);
    setError('');

    try {
      // Upsert to nomor_rekening table
      const { error: updateError } = await supabase
        .from('nomor_rekening')
        .upsert({
          user_id: user.id,
          bank_name: newBank.bankName,
          account_number: newBank.accountNumber,
          account_name: newBank.accountName
        }, { onConflict: 'user_id' });

      if (updateError) {
        throw updateError;
      }

      setBankAccount(newBank);
      setIsAddingBank(false);
    } catch (err: any) {
      console.error('Save bank error:', err);
      setError('Gagal menyimpan detail rekening ke server. Pastikan kolom di database sudah ditambahkan.');
    } finally {
      setIsSavingBank(false);
    }
  };

  const handleWithdraw = async () => {
    const withdrawValue = parseInt(amount) || 0;
    
    if (withdrawValue < minWithdrawal) {
      setError(`Minimal penarikan adalah Rp ${minWithdrawal.toLocaleString('id-ID')}`);
      return;
    }
    if (withdrawValue > balance) {
      setError('Saldo tidak mencukupi.');
      return;
    }
    if (!bankAccount) {
      setError('Silakan tambahkan rekening bank tujuan.');
      return;
    }
    if (!user) {
      setError('Sesi tidak valid.');
      return;
    }

    setError('');
    setStep('processing');
    
    try {
      const { error: insertError } = await supabase
        .from('data_penarikan')
        .insert({
          user_id: user.id,
          amount: withdrawValue,
          bank_name: bankAccount.bankName,
          account_number: bankAccount.accountNumber,
          account_name: bankAccount.accountName,
          status: 'pending'
        });

      if (insertError) throw insertError;

      setStep('success');
    } catch (err: any) {
      console.error('Withdrawal error:', err);
      setError('Gagal memproses penarikan: ' + (err.message || 'Periksa koneksi database Anda'));
      setStep('form');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in-simple"
        onClick={step === 'processing' ? undefined : () => { onClose(); if (step === 'success') window.location.reload(); }}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
        
        {/* Floating Error Toast */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[90%] transition-all duration-500 transform ${error ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <div className="bg-red-600/95 backdrop-blur-md text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl shadow-red-900/30 border border-red-500/50">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-100" />
            <p className="text-sm font-bold leading-tight">{error}</p>
            <button onClick={() => setError('')} className="ml-auto flex-shrink-0 bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {step !== 'processing' && step !== 'success' && (
          <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-100">
            <div>
              <h3 className="text-2xl font-black text-gray-900 leading-none">Tarik Saldo</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Pencairan Komisi Affiliate</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-6 lg:p-8 overflow-y-auto">
          {step === 'form' && (
            <div className="space-y-8 animate-fade-in">
              {/* Balance Summary */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70 mb-1">Total Saldo Tersedia</div>
                  <div className="text-2xl font-black text-emerald-700">{formatCurrency(balance)}</div>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Jumlah Penarikan</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">Rp</div>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-xl text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all font-mono"
                    placeholder="0"
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-gray-400">Min. {formatCurrency(minWithdrawal)}</span>
                  <button 
                    onClick={() => setAmount(balance.toString())}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors"
                  >
                    Tarik Semua
                  </button>
                </div>
              </div>

              {/* Bank Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tujuan Pencairan</label>
                  {!isAddingBank && bankAccount && (
                    <button 
                      onClick={() => setIsAddingBank(true)}
                      className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:text-primary-700"
                    >
                      Ubah Rekening
                    </button>
                  )}
                </div>

                {isAddingBank ? (
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4">
                    <select 
                      value={newBank.bankName}
                      onChange={(e) => setNewBank({...newBank, bankName: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary-100"
                    >
                      <option value="BCA">BCA (Bank Central Asia)</option>
                      <option value="Mandiri">Bank Mandiri</option>
                      <option value="BNI">BNI (Bank Negara Indonesia)</option>
                      <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
                      <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                      <option value="GoPay">GoPay</option>
                      <option value="OVO">OVO</option>
                      <option value="Dana">DANA</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Nomor Rekening / E-Wallet"
                      value={newBank.accountNumber}
                      onChange={(e) => setNewBank({...newBank, accountNumber: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary-100"
                    />
                    <input 
                      type="text" 
                      placeholder="Atas Nama (Sesuai Rekening)"
                      value={newBank.accountName}
                      onChange={(e) => setNewBank({...newBank, accountName: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary-100 uppercase"
                    />
                    <div className="flex gap-2">
                       {bankAccount && (
                         <Button variant="outline" className="flex-1 py-3 text-sm" onClick={() => setIsAddingBank(false)}>Batal</Button>
                       )}
                       <Button 
                         className="flex-1 py-3 text-sm shadow-xl shadow-primary-200" 
                         onClick={handleSaveBank}
                         disabled={isSavingBank}
                       >
                         {isSavingBank ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Simpan Rekening'}
                       </Button>
                    </div>
                  </div>
                ) : bankAccount ? (
                  <div className="bg-white border-2 border-primary-100 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group">
                     <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 border border-primary-100 relative z-10">
                        <Landmark className="w-6 h-6" />
                     </div>
                     <div className="relative z-10">
                        <div className="text-xs font-black text-gray-500 uppercase tracking-widest">{bankAccount.bankName}</div>
                        <div className="text-lg font-black text-gray-900 tracking-wider font-mono my-0.5">{bankAccount.accountNumber}</div>
                        <div className="text-[10px] font-bold text-gray-400">A.N. {bankAccount.accountName.toUpperCase()}</div>
                     </div>
                     <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primary-50 to-transparent z-0"></div>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white z-10 border-2 border-white shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                     </div>
                  </div>
                ) : null}
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleWithdraw}
                  className="w-full py-5 text-lg shadow-2xl shadow-emerald-200 bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-300 border-none"
                  rounded="full"
                >
                  Proses Penarikan Komisi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="mt-4 flex items-start gap-2 text-[10px] font-bold text-gray-400 leading-relaxed justify-center">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                  <p>Dana akan diproses dalam waktu maksimal 2x24 jam hari kerja. Pastikan detail rekening sudah benar.</p>
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-emerald-600 relative z-10" />
                </div>
                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Memproses Penarikan...</h3>
                <p className="text-gray-500 font-medium max-w-xs mx-auto text-sm leading-relaxed">
                  Sistem sedang memverifikasi saldo dan meneruskan permintaan ke bank tujuan ({bankAccount?.bankName}).
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-6 animate-scale-up">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-200 mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Berhasil Meminta Penarikan!</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  Permintaan penarikan dana sebesar <strong className="text-gray-900">{formatCurrency(parseInt(amount) || 0)}</strong> telah dicatat.
                </p>
              </div>
              
              <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 border-dashed space-y-3 text-left">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Bank Tujuan</span>
                    <span className="text-sm font-bold text-gray-900">{bankAccount?.bankName}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">No. Rekening</span>
                    <span className="text-sm font-bold text-gray-900 font-mono">{bankAccount?.accountNumber}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Atas Nama</span>
                    <span className="text-sm font-bold text-gray-900">{bankAccount?.accountName.toUpperCase()}</span>
                 </div>
              </div>

              <Button 
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="w-full py-4 text-base mt-4"
                rounded="full"
                variant="outline"
              >
                Kembali ke Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
