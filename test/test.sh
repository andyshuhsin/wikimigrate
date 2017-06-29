cd test

if [ $# -eq 0 ]
then
    glob='*.spec.ts'
else
    glob="$1*"
fi

for spec in $(find . -name ${glob})
do
    echo "\nTesting ${spec}"
    ts-node --fast ${spec}
done
