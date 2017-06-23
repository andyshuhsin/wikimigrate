echo "testing"

cd test

for spec in $(find . -name '*.spec.ts')
do
    echo "Testing ${spec}"
    ts-node ${spec}
done
