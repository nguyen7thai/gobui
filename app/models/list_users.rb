class ListUsers
  KEY = 'list_users'
  def self.add_user(user_id, username)
    list = self.all
    list[user_id] = username
    self.save(list)
    list
  end
  
  def self.user_exists? user_id
    self.all[user_id].present?
  end

  def self.all
    if json = redis.get(KEY)
      JSON.parse json
    else
      {} 
    end
  end

  def self.save(list)
    redis.set(KEY, list.to_json)
  end

  def self.get_username user_id
    self.all[user_id]
  end

  def self.delete(user_id)
    if self.user_exists?(user_id)
      list = self.all
      list.delete(user_id)
      self.save(list)
    end
    list
  end

  def self.redis
    REDIS
  end
  
  def self.delete_all
    REDIS.set(KEY, {})
  end
end
