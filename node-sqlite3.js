//init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

//sqlite3 常见操作
/*
    表的创建、修改、删除
    create table 表名(字段名 字段类型 [约束],....)
    例: CREATE TABLE user_table (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, SenderId   varchar(30)   NOT NULL,Createdtime varchar(30)  NOT NULL)

    alter table 表名 { rename to 新名字 | add column 字段 字段类型};
    drop table 表名;

    记录的增、删、改、查
    insert into 表名(字段名,...)values(字段值,...);
    insert into 表名 values(字段值,...);

    delete from 表名 [where 条件];

    update 表名 set 字段=新值[where 条件];

    select * from 表名 [where 条件];
----------------------------------------------------------------
    sqlite3 接口函数

    sqlite3 数据库连接对象
    sqlite3_stmt 编译后的SQL语句对象
    sqlite3_open() 打开或创建一个数据库连接
    sqlite3_prepare() 准备SQL语句
    sqlite3_bind() 绑定参数
    sqlite3_step() 执行准备好的SQL语句
    sqlite3_column() 从sqlite3_stmt中取字段值
    sqlite3_finalize() 用来释放sqlite3_stmt
    sqlite3_close() 关闭数据库
    sqlite3_exec() 执行SQL语句
-----------------------------------------------------------------
    sqlite3
    sqlite3_open
    sqlite3_exec
    sqlite3_close
    sprintf()
-----------------------------------------------------------------
    sqlite3 数据库连接对象
    sqlite3_stmt 编译后的SQL语句对象
    sqlite3_open() 打开或创建一个数据库连接
    sqlite3_prepare()准备SQL语句
    sqlite3_bind() 绑定参数
    sqlite3_step() 执行准备好的SQL语句
    sqlite3_column() 从sqlite3_stmt中取字段值
    sqlite3_finalize() 用来释放sqlite3_stmt
    sqlite3_close()
    
------------------------------------------------------------------
  db.all(sql,callback(err,row)) 与 db.each(sql,callback(err,row)) 
allNotes 和 forAll 函数是操作所有数据的两种方法.
allNotes把数据库中所有的数据行收集到一个数组里，而forAll方法可以接受两个回调函数，每当从数据集中拿一行数据，回调函数doEach都会执行一遍，当读完所有数据时，回调函数done就会执行。
    exports.findNoteById = function(ts,callback){
        var didOne = false;
        db.each("SELECT * FROM notes WHERE ts = ?",
            [ts],
            function(err,row){
                if(err){
                    util.log('FALL to retrieve row ' + err);
                    callback(err,null);
                }else{
                    if (!didOne){
                    callback(null, row);
                    didOne = true;   //保证回调函数只被执行一次
                }
                }
            }
    )
    }

    exports.allNotes = function(callback){
        util.log(' in allnote');
        db.all("SELECT * FROM notes", callback);
    }
    exports.forAll = function(doEach, done){
        db.each("SELECT * FROM notes", function(err, row){
            if (err){
                util.log('FAIL to retrieve row ' + err);
                done(err, null);
            } else {
                doEach(null, row);
            }
        }, done);
    }
*/

//Sqlite 修改数据库表名修改、增加字段
/*
Sqlite 仅仅支持ALTER TABLE 语句的一部分功能， 我们可以用 ALTER TABLE语句来更改一个表的名字，也可向表中增加一个字段(列)，但是我们不能删除一个已经存在的字段，或者更改一个已经存在的字段的名称、数据类型、限定符等等。
    改变表名 - ALTER TABLE 旧表名 RENAME TO 新表名
    增加一列 - ALTER TABLE 表名 ADD COLUMN 列名 数据类型
    !*而修改一列无法像其他数据库一样直接以"ALTER TABLE 表名 ADD COLUMN 列名 数据类型"的方式来完成，所以需要:
        -将表名改为临时表
            ALTER TABLE "old_table" RENAME TO "new_table";
        -创建新表
            CREATE TABLE "old_table"(
                "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
                "Name" Text
            );
        -导入数据
            INSERT INTO "old_table"("ID","Name")SELECT "ID","Title" FROM "new_table";
        -更新sqlite_sequence*[1]
            UPDATE"sqlite_sequence"SET seq=3 WHERE name="old_table";
                *[1]: 由于在Sqlite中使用自增长字段，引擎会自动产生一个sqlite_sequence表，用于记录每个表的自增长字段的已使用的最大值，所以要一起更新下。如果没有设置自增长，则跳过此步骤。
        -删除临时表(可选)
            DROP FROM new_table;
-------------------------------------------------------------------
常用命令行
             $sqlite3 testDB.db          进入数据库
                      testDB.db .dump > testDB.sql  导出完整的数据库在一个文本文件中
            上面的命令将转换整个 testDB.db 数据库的内容到 SQLite 的语句中，并将其转储到 ASCII 文本文件 testDB.sql 中。您可以通过简单的方式从生成的 testDB.sql 恢复，如下所示：
             $sqlite3 testDB.db < testDB.sql            


             sqlite>.database          查看数据库
                    .quit             退出数据库
                    VACUUM;         释放碎片空间


             sqlite>.tables          查看此数据库下的表
                    .schema             查看所有表结构
                    DROP TABLE tableName    删除表
-------------------------------------------------------------------
SQlite在已创建的表中删除一列
    1.根据原表创建一张新表(不读取需要删除的列名)
    create table teacher as select id,name from student

    2.删除原表

    3.将新表重名为旧表的名称
-------------------------------------------------------------------
//数据库对象的run函数可以执行任何的SQL语句，该函数一般不用来执行查询
            (插入或替换)、(删除)、(修改)INSERT OR REPLACE  INTO  [node.js中使用]----> 

            db.prepare


           
            





















/*
    语法:   fs.exists(path,callback);
    方法说明:测试某个路径下的文件是否存在
            回调函数包含一个参数exists，true则文件存在，否则是false
    //  接受参数.path  需要检测的文件路径
    //  callback 回调
    fs.exists = function(path,callback){
        if(!nullCheck(path,cb)) return;
        bingding.stat(pathModule._makeLong(path),cb);
        function cb(err,stats){
            if(callback) callback(err ? false : true);
        }
    }   

    语法:   fs.existsSync(path);
    方法说明:同步版的 fs.exists();
    //   接受参数.path  需要检测的文件路径
    fs.existsSync = function(path){
        try{
            nullCheck(path);
            binding.stat(pathModule._makeLong(path));
            return true;
        } catch (e){
            return false;
        }     
    }
*/
/*
sqlite3.vervose()  - 设置执行模式为输出调用堆栈
new sqlite3.Database(filename) - 打开名称为filename的数据库并返回创建的数据库对象
*/

