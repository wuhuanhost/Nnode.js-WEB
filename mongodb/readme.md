# mongodb 常用命令

### 通过配置文件启动mongdb

```
mongod --config  mongo.conf
```

### 导出数据文件

```
mongodump -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -o 文件存在路径 

# 如果没有用户谁，可以去掉-u和-p。
# 如果导出本机的数据库，可以去掉-h。
# 如果是默认端口，可以去掉--port。
# 如果想导出所有数据库，可以去掉-d。
```

**导出全部数据数据库**
```
mongodump -h 127.0.0.1 -o E:\mongondb\dump 
```

### 导入数据文件

```
mongorestore -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 --drop 文件存在路径 
```

>>> --drop的意思是，先删除所有的记录，然后恢复。

**导入全部数据库**
```
mongorestore E:\mongondb\dump 
```

**导入user数据库**

```
mongorestore -d user E:\mongondb\dump\user  #tank这个数据库的备份路径  
```