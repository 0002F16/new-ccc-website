module.exports = {
  apps: [
    {
      name: 'ccc-website',
      cwd: '/srv/ccc-website/current',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3210',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '750M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}

