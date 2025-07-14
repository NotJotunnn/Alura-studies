import styles from "./Item.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineCheck,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { mudarCarrinho, mudarQuantidade } from "store/reducers/carrinho";
import { deletarItem, mudarFavorito, mudarItem } from "store/reducers/itens";
import classNames from "classnames";
import { memo, useState } from "react";
import Input from "components/Input";

function Item(props) {
  const { titulo, foto, preco, descricao, favorito, id, carrinho, quantidade } =
    props;

  const [modoDeEdicao, setModoDeEdicao] = useState(false);
  const [novoItem, setNovoItem] = useState({
    titulo,
    foto,
    descricao,
    preco,
  });

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

  const componenteModoDeEdicao = (
    <>
      {modoDeEdicao ? (
        <AiOutlineCheck
          {...iconProps}
          className={styles["item-acao"]}
          onClick={() => {
            setModoDeEdicao(false);
            dispatch(mudarItem({ id, item: { ...novoItem } }));
          }}
        />
      ) : (
        <AiFillEdit
          {...iconProps}
          className={styles["item-acao"]}
          onClick={() => setModoDeEdicao(true)}
        />
      )}
    </>
  );

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: carrinho,
      })}
    >
      <AiFillCloseCircle
        {...iconProps}
        className={`${styles["item-acao"]} ${styles["item-deletar"]}`}
        onClick={() => dispatch(deletarItem(id))}
      />
      <div className={styles["item-imagem"]}>
        {modoDeEdicao ? (
          <Input
            value={novoItem.foto}
            onChange={(evento) =>
              setNovoItem((oldItem) => ({
                ...oldItem,
                foto: evento.target.value,
              }))
            }
          />
        ) : (
          <img src={foto} alt={titulo} />
        )}
      </div>

      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          {modoDeEdicao ? (
            <Input
              value={novoItem.titulo}
              onChange={(evento) =>
                setNovoItem((oldItem) => ({
                  ...oldItem,
                  titulo: evento.target.value,
                }))
              }
            />
          ) : (
            <h2>{titulo}</h2>
          )}
          {modoDeEdicao ? (
            <Input
              value={novoItem.descricao}
              onChange={(evento) =>
                setNovoItem((oldItem) => ({
                  ...oldItem,
                  descricao: evento.target.value,
                }))
              }
            />
          ) : (
            <p>{descricao}</p>
          )}
        </div>

        <div className={styles["item-info"]}>
          {modoDeEdicao ? (
            <Input
              value={novoItem.preco}
              onChange={(evento) =>
                setNovoItem((oldItem) => ({
                  ...oldItem,
                  preco: Number(evento.target.value),
                }))
              }
              style={{ width: 170 }}
            />
          ) : (
            <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>
          )}

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
                    if (quantidade >= 1)
                      dispatch(mudarQuantidade({ id, quantidade: -1 }));
                  }}
                  {...quantidadeProps}
                />
                <span>{String(quantidade || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  onClick={() =>
                    dispatch(mudarQuantidade({ id, quantidade: +1 }))
                  }
                  {...quantidadeProps}
                />
              </div>
            ) : (
              <>
                <FaCartPlus
                  {...iconProps}
                  color={estaNoCarrinho ? "#1875e8" : iconProps.color}
                  className={styles["item-acao"]}
                  onClick={resolverCarrinho}
                />
                {componenteModoDeEdicao}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
