import MenuItem from "../../Menu/MenuItem";
import MenuList from "../../Menu/MenuList";

const HeaderLinks = () => {
  return (
    <MenuList>
      <MenuItem href="/eventos">Eventos</MenuItem>
      <MenuItem href="/clube-fidelidade">Clube fidelidade</MenuItem>
      <MenuItem href="/sobre-nos">Sobre nós</MenuItem>
    </MenuList>
  );
}
 
export default HeaderLinks;