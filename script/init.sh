rm -rf ./dist
rm -rf node_modules
git submodule update --init
yarn install
echo 'init success'