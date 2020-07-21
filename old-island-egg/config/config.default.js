/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594867374424_9047';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',       // 哪种数据库
    host: 'localhost',
    port: 3306,
    database: 'island-egg',      // 数据库名
    username: 'root',
    password: 'fengxia',
    timezone: '+08:00',
    define: {
      timestamps: true,        //是否自动生成时间字段（createdAt，updatedAt）， 默认true，生成
      paranoid: true,           // deletedAt, 默认 false， 软删除
      createdAt: 'created_at',      // 默认生成createdAt， 换成 'created_at'
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,            // 多单词拼接的字段名，默认是驼峰式写法，换成下环线拼接
      freezeTableName: true,        // 防止修改表名为复数
      scopes: {
        del_time: {       // del_time 自定义的命名空间, 在 art.js里有调用示例
          attributes: {
            exclude: ['updated_at', 'created_at', 'deleted_at']     // 返回结果排除这三个字段
          }
        }
      },
      dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
        dateStrings: true,
        typeCast(field, next) {
          if(field.type === "DATETIME"){
            return field.string();
          }
          return next();
        }
      }
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
