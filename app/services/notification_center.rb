class NotificationCenter
  APN = Rails.env.production? ? Houston::Client.production : Houston::Client.development
  VOIP_PEM = 'voip.pem'
  path =  File.join(Rails.root, VOIP_PEM)
  APN.certificate = File.read(path)

  def self.notify(token, data={})
    notification = Houston::Notification.new(device: token)
    notification.custom_data = data
    APN.push(notification)
  end
end
