export NOTES_DIR="$HOME/work-notes"
export ME="timcreasman"
export WORK_DIR="$HOME/projects/pattern"

export PS1="🌲%(?.%F{green}√.%F{red}?%?)%f %1~ $"

alias reloadshell=". ~/.zshrc"
alias console="cd $WORK_DIR/"
alias server="cd $WORK_DIR/"
alias scripts="cd $HOME/scripts"
alias gitnote="notable create -dgo"
alias zshrc="open ~/.zshrc"

fpath=( ~/.zfunc "${fpath[@]}" )
autoload -Uz ~/.zfunc/*