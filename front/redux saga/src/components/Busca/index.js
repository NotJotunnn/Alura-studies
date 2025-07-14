import { useDispatch, useSelector } from "react-redux";
import styles from "./Busca.module.scss";
import { mudarBusca, resetarBusca } from "store/reducers/busca";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Busca() {
  const location = useLocation()
  const dispatch = useDispatch()
  const busca = useSelector(state => state.busca)

  useEffect(() => {
    dispatch(resetarBusca())
  }, [location.pathname, dispatch])

  return (
    <div className={styles.busca}>
      <input className={styles.input} placeholder="O que você procura?" value={busca} onChange={evento => dispatch(mudarBusca(evento.target.value))} />
    </div>
  );
}
