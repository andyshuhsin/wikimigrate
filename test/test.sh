cd test

for spec in $(find . -name '*.spec.ts')
do
    echo "\nTesting ${spec}"
    ts-node ${spec}
done
