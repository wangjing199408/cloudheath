# !/bin/sh

cd $(dirname $0)

DATABASE="cloudheath"

if [[ $1 == 'snap' ]]; then
  rm -fr $PWD'/'$DATABASE

  mongodump -d $DATABASE -o .
  rm -fr $DATABASE/sessions.*
  rm -fr $DATABASE/system.indexes.*
else
  mongo $DATABASE --eval 'db.dropDatabase()'
  mongorestore -d $DATABASE $DATABASE
fi
