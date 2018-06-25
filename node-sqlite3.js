//init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').vervose();
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

