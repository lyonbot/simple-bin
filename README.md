# simple-bin

A simple demo with backend, frontend and docker-compose:

- backend: hapi + nodejs
- frontend: (anything) + vite build
- docker-compose: prod and dev separated

## For Developer

### Local Developing

Make sure you have `tmux` installed.

Run `bash dev.sh`

When started, modify files and reload:

- For backend: modify `backend/src` and execute `r` in the shell to restart app

- For frontend: modify `nginx/src` and refresh your browser (no command requred)

To install package(s), enter the directory and run `npm install xxx` on the host (not container). Then you must exit the shell and restart everything.

Finally, to stop, execute `q` in the shell


### Run as Production mode

Modify the env (PORT) in *prod.sh*, if needed.

Run `bash prod.sh`