import sqlite3
con = sqlite3.connect('tutorial.db')

cur  = con.cursor()


res = cur.execute('select name from sqlite_master where type="table"')
print(res.fetchone())

con.commit()
cur.execute("INSERT INTO movie VALUES('Forrest Gump', 1994, 8.8)")
cur.execute("INSERT INTO movie VALUES('The Shawshank Redemption', 1994, 9.3)")
cur.execute("INSERT INTO movie VALUES('The Godfather', 1972, 9.2)")
cur.execute("INSERT INTO movie VALUES('The Dark Knight', 2008, 9.0)")
cur.execute("INSERT INTO movie VALUES('Pulp Fiction', 1994, 8.9)")
cur.execute("INSERT INTO movie VALUES('The Lord of the Rings: The Return of the King    ', 2003, 8.9)")
con.commit()

res = cur.execute("SELECT * FROM movie")
print(res.fetchall())
con.close()