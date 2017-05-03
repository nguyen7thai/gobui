class Test
  APN = Houston::Client.development
  def self.test
    normal = 'dev_goper.pem'
    voip = 'voip.pem'
    path =  File.join(Rails.root, voip)
    APN.certificate = File.read(path)

    # An example of the token sent back when a device registers for notifications
    token ="<0ac8f728 cf2b4c63 de91f6a4 ff037410 19987e60 990bf56a b6df9ec6 2d714548>"
    voip_token = "<16a75f76 4f4082d8 d9d30845 d7eb6aa7 ce8e2eaf ab323db7 f86b73e4 48cd47b8>"

    # Create a notification that alerts a message to the user, plays a sound, and sets the badge on the app
    notification = Houston::Notification.new(device: voip_token)
    notification.alert = 'Hello, World!'
    notification.badge = 57
    notification.category = 'INVITE_CATEGORY'
    notification.content_available = true
    notification.mutable_content = true
    notification.custom_data = { foo: 'bar' }
    APN.push(notification)
  end
end
