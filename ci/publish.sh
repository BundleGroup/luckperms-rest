npm_publish() {
    npm publish 2>&1; echo "$?" >> /tmp/npm_status.txt; }; 
    return 0
}

npm_publish | tee /tmp/npm.txt

if [[ ! "$(cat /tmp/npm_status.txt)" -eq "0" ]] && [[ -z "$(cat /tmp/npm.txt | grep "You cannot publish over the previously published versions:")" ]]; then 
    exit 1;
fi;