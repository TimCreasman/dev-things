#!/bin/zsh

# # Change desktop picture
# /bin/bash /Users/timcreasman/scripts/set-desktop.sh /Users/timcreasman/Documents/DesktopBackgrounds/sleep-background.png

# quit all applications
filename="dev-applications.txt"

# https://unix.stackexchange.com/a/580545
while IFS='' read -r LINE || [ -n "${LINE}" ]; do
    osascript -e "tell application \"${LINE}\" to quit"
done < "scripts/$filename"

# terminate Terminal "gracefully"
osascript -e "do shell script \"osascript -e \\\"tell application \\\\\\\"Terminal\\\\\\\" to quit\\\" &> /dev/null &\""; exit
