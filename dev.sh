export COMPOSE_PROJECT_NAME=simple-bin-dev
export PORT=3000

case "$1" in
  subcmd_main)
    docker-compose up --build
    echo "-----------------------"
    echo "[Press Enter to Exit]"
    read x
    ;;
  
  subcmd_dev_nginx)
    cd nginx && npm run dev
    ;;

  subcmd_term_rc)
    show_help() {
      echo "[Commands]-------------"
      echo "  r   restart backend"
      echo "  q    exit"
      echo "-----------------------"
    }

    show_help

    while echo -n "> " && read cmd; do
      case $cmd in
        r*) docker-compose restart backend ;;
        q*) break ;;
        *) show_help ;;
      esac
    done

    session_name=$(tmux list-panes -t "$TMUX_PANE" -F '#S' | head -n1)
    tmux kill-session -t $session_name

    ;;

  *)
    tmux \
        new-session  "$0 subcmd_main" \; \
        split-window -h "$0 subcmd_dev_nginx" \; \
        split-window -h "$0 subcmd_term_rc" \;
    docker-compose stop
    ;;
esac
