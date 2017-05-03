# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

bebe = User.find_or_create_by(username: 'bebe', password: 'bebe')
pimpim = User.find_or_create_by(username: 'pimpim', password: 'pimpim')
thapbui = User.find_or_create_by(username: 'thapbui', password: 'thapbui')
befake = User.find_or_create_by(username: 'befake', password: 'befake')

a1 = Activity.find_or_create_by(
  name: 'Go Bui',
  description: 'Gggg',
  accept_message: 'Ggggg',
  deny_message: 'Dang ban roi bui',
  voice_name: 'bebe_voice.caf')
a2 = Activity.find_or_create_by(
  name: 'Go Pim',
  description: 'Beeeeeeeee',
  accept_message: 'Pim xuong lien',
  deny_message: 'Pim dang ban, bedeptrai cho pim xiu',
  voice_name: 'gopim.caf')
a3 = Activity.find_or_create_by(
  name: 'Bebe call bebe',
  description: 'For test',
  accept_message: 'uhyeah',
  deny_message: 'Oh noo',
  voice_name: 'bebe_voice.caf'
)

bebe.activities << a1
bebe.activities << a2
bebe.save

thapbui.activities << a1
thapbui.save

pimpim.activities << a2
pimpim.save

a3.users = [bebe, befake]
a3.save


