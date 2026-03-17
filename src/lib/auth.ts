import { supabase } from './supabase';

// ─── TIPE DATA ────────────────────────────────────────────────────────────────

export interface RegisterData {
  // Akun
  username: string;
  email: string;
  password: string;
  // Profil
  firstName: string;
  lastName: string;
  whatsapp: string;
  // Alamat
  province: string;
  regency: string;
  address: string;
  // Data Pribadi
  birthPlace: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  // Data Orang Tua
  parentName: string;
  parentWhatsapp: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────

export async function registerAffiliate(data: RegisterData): Promise<AuthResult> {
  try {
    // 1. Daftarkan akun ke Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });

    if (signUpError) {
      return { success: false, message: translateError(signUpError.message) };
    }

    if (!authData.user) {
      return { success: false, message: 'Gagal membuat akun. Silahkan coba lagi.' };
    }

    // 2. Simpan data profil lengkap ke tabel 'affiliate_profiles'
    const { error: profileError } = await supabase
      .from('affiliate_profiles')
      .insert({
        user_id: authData.user.id,
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        whatsapp: data.whatsapp,
        province: data.province,
        regency: data.regency,
        address: data.address,
        birth_place: data.birthPlace,
        birth_date: `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`,
        parent_name: data.parentName,
        parent_whatsapp: data.parentWhatsapp,
        status: 'pending', // Status awal: menunggu verifikasi admin
      });

    if (profileError) {
      console.error('Gagal menyimpan profil:', profileError);
      // Akun berhasil dibuat, tapi data profil gagal — tetap sukses tapi log error
      return {
        success: true,
        message: 'Akun berhasil dibuat! Silahkan cek email untuk verifikasi. (Data profil perlu dilengkapi kembali)',
      };
    }

    return {
      success: true,
      message: 'Pendaftaran berhasil! Silahkan cek email Anda untuk verifikasi akun.',
    };
  } catch (err) {
    console.error('Register error:', err);
    return { success: false, message: 'Terjadi kesalahan tak terduga. Silahkan coba lagi.' };
  }
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

export async function loginAffiliate(email: string, password: string): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, message: translateError(error.message) };
    }

    return { success: true, message: 'Login berhasil!' };
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Terjadi kesalahan. Silahkan coba lagi.' };
  }
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

export async function logoutAffiliate(): Promise<void> {
  await supabase.auth.signOut();
}

// ─── GET SESSION ──────────────────────────────────────────────────────────────

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ─── TERJEMAHAN ERROR ─────────────────────────────────────────────────────────

function translateError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email atau password salah.';
  if (msg.includes('Email not confirmed')) return 'Email belum diverifikasi. Cek inbox Anda.';
  if (msg.includes('User already registered')) return 'Email sudah digunakan. Gunakan email lain.';
  if (msg.includes('Password should be at least')) return 'Password minimal 6 karakter.';
  if (msg.includes('Unable to validate email address')) return 'Format email tidak valid.';
  if (msg.includes('signup is disabled')) return 'Pendaftaran sementara tidak tersedia.';
  return msg;
}
