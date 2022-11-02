#!/bin/zsh

# Change desktop picture
#/bin/bash /Users/timcreasman/scripts/set-desktop.sh /Users/timcreasman/Documents/DesktopBackgrounds/dev-background.png

# open all applications
filename="dev-applications.txt"

# https://unix.stackexchange.com/a/580545
while IFS='' read -r LINE || [ -n "${LINE}" ]; do
    open -a "${LINE}" --background
done < "scripts/$filename"

# Tell spotify to play coding playlist spotify:playlist:61rzkzPuioAj4zg1IjyLzo
osascript -e 'tell application "Spotify"
                play track "spotify:playlist:61rzkzPuioAj4zg1IjyLzo"
            end tell'

# Hide Spotify
osascript -e 'tell application "System Events" to set visible of process "Spotify" to false'

# terminate Terminal "gracefully"
osascript -e "do shell script \"osascript -e \\\"tell application \\\\\\\"Terminal\\\\\\\" to quit\\\" &> /dev/null &\""; exit
