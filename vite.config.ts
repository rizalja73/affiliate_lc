import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to inject n8n chat script after build
function injectN8nChat() {
  return {
    name: 'inject-n8n-chat',
    transformIndexHtml(html: string) {
      return html.replace(
        '</body>',
        `<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
  createChat({
    webhookUrl: 'https://wabot-n8n.fbywp0.easypanel.host/webhook/7c0e5f40-ae16-4df6-8901-4d1309f49403/chat'
  });
</script>
</body>`
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectN8nChat()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
