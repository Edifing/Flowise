module.exports = {
  apps: [
    {
      name: 'main-app',
      script: 'pnpm',
      args: 'start',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/app-error.log',
      out_file: './logs/app-out.log',
      log_file: './logs/app.log',
      time: true
    },
    {
      name: 'keepalive',
      script: './keepalive.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '100M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/keepalive-error.log',
      out_file: './logs/keepalive-out.log',
      log_file: './logs/keepalive.log',
      time: true
    }
  ]
};
