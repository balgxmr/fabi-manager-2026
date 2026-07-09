provider "azurerm" {
  features {}
}
data "azurerm_resource_group" "rg" {
  name = "ProyectoFinalTopicos"
}
data "azurerm_subnet" "subnet" {
  name                 = "proyectofinal-subnet-aci"
  virtual_network_name = "proyectofinal-vnet"
  resource_group_name  = "ProyectoFinalTopicos"
}
resource "azurerm_container_group" "aci" {
name                = "proyectofinal-aci"
  location            = "East US 2"
  resource_group_name = data.azurerm_resource_group.rg.name
  os_type             = "Linux"
  ip_address_type     = "Private" # Ajustado para tu red virtual
  subnet_ids          = [data.azurerm_subnet.subnet.id]
  restart_policy      = "Always"
  container {
name   = "fabi-manager"
    image  = "proyectofinalacr.azurecr.io/fabi-manager@sha256:007f6119bbd6fd779c17098ba45eb9f0563a688445e5a63569ebfa4c42935aa5"
    cpu    = "0.5"
    memory = "1"
    ports {
      port     = 80
      protocol = "TCP"
    }
 }
  image_registry_credential {
    server   = "proyectofinalacr.azurecr.io"
    username = "proyectofinalacr"
    password = "FLw2Nffa8O1BVo0v9JgeTYrrOpcFpKxgSJeCexvn4ibw7I6Y0ZfVJQQJ99CFACHYHv6Eqg7NAAACAZCRa15v"
  }
  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}
variable "acr_password" {
  type      = string
 sensitive = true
}
