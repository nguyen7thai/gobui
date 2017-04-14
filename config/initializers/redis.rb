uri = URI.parse(ENV["REDIS_URL"] || 'redis://localhost:6379')
REDIS_URL = uri
REDIS = Redis.new url: REDIS_URL
