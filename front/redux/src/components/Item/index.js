import styles from "./Item.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { mudarCarrinho, mudarQuantidade } from "store/reducers/carrinho";
import { mudarFavorito } from "store/reducers/itens";
import classNames from "classnames";

export default function Item(props) {
  const { titulo, foto, preco, descricao, favorito, id, carrinho, quantidade } = props;

  const iconProps = {
    color: "#041833",
    size: 24,
  };

  const quantidadeProps = {
    color: "#1875E8",
    size: 32,
  };

  const dispatch = useDispatch();

  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((item) => item.id === id)
  );

  function resolverFavorito() {
    dispatch(mudarFavorito(id));
  }

  function resolverCarrinho() {
    dispatch(mudarCarrinho(id));
  }

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: carrinho,
      })}
    >
      <div className={styles["item-imagem"]}>
        <img src={foto} alt={titulo} />
      </div>

      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>

        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>

          <div className={styles["item-acoes"]}>
            {favorito ? (
              <AiFillHeart
                onClick={resolverFavorito}
                {...iconProps}
                color="#ff0000"
                className={styles["item-acao"]}
              />
            ) : (
              <AiOutlineHeart
                onClick={resolverFavorito}
                {...iconProps}
                className={styles["item-acao"]}
              />
            )}
            {carrinho ? (
              <div className={styles.quantidade}>
                Quantidade:
                <AiFillMinusCircle
                  onClick={() => {
                    if(quantidade >= 1) dispatch(mudarQuantidade({ id, quantidade: -1 }))
                  }}
                  {...quantidadeProps}
                />
                <span>{String(quantidade || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  onClick={() => dispatch(mudarQuantidade({ id, quantidade: +1 }))}
                  {...quantidadeProps}
                />
              </div>
            ) : (
              <FaCartPlus
                {...iconProps}
                color={estaNoCarrinho ? "#1875e8" : iconProps.color}
                className={styles["item-acao"]}
                onClick={resolverCarrinho}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
