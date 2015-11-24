VAGRANTFILE_API_VERSION = "2"    #定义版本
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|  #使用内部2版本
  config.vm.define "default" do |v|  #定义第一台虚拟机，||里面就类似一个变量设置参数时使用 
     v.vm.box = "centos66"             #设置box名为Master
     v.vm.host_name = "codetainer"      #设置hostname为Master
     v.vm.network :forwarded_port, guest: 4200, host: 4200
     v.vm.network :forwarded_port, guest: 20004, host: 27017
     v.vm.network :private_network, ip: "192.168.59.65" #设置网络为内部网络 ip为192.168.59.200
  end
end
