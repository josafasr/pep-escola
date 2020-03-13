export default (sequelize, DataTypes) => {
  const AuthUser = sequelize.define('AuthUser', {
    userName: {
      type: DataTypes.STRING,
      field: 'user_name'
    },
    password: {
      type: DataTypes.STRING
    },
    userType: {
      type: DataTypes.INTEGER,
      field: 'user_type'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active'
    }
  }, {
    schema: 'public',
    tableName: 'auth_user'
  })
  return AuthUser
}
