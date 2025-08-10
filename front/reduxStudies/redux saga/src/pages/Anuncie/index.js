import Header from "components/Header";
import styles from "./Anuncie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import { useForm } from "react-hook-form";
import { cadastrarItem } from "store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "components/Input";
import { useEffect } from "react";
import {
  carregarCategoria,
  carregarCategorias,
} from "store/reducers/categorias";

export default function Anuncie() {
  const { nomeCategoria = "" } = useParams();
  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoria: nomeCategoria,
    },
  });

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
  }

  useEffect(() => {
    dispatch(
      nomeCategoria ? carregarCategoria(nomeCategoria) : carregarCategorias()
    );
  }, [dispatch, nomeCategoria]);

  return (
    <div className={styles.container}>
      <Header
        titulo={"Anuncie aqui!"}
        descricao={"Anuncie seu produto no melhor site do Brasil!"}
      />

      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input
          style={{ outline: errors.titulo ? "2px solid red" : "" }}
          className={errors.titulo ? styles["input-erro"] : ""}
          {...register("titulo", { required: "O campo titulo é obrigatório!" })}
          placeholder="titulo do produto"
          alt="titulo do produto"
        />
        {errors.titulo && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.titulo.message}{" "}
          </span>
        )}
        <Input
          style={{ outline: errors.descricao ? "2px solid red" : "" }}
          className={errors.descricao ? styles["input-erro"] : ""}
          {...register("descricao", {
            required: "O campo descrição é obrigatório!",
          })}
          placeholder="Descrição do produto"
          alt="descrição do produto"
        />
        {errors.descricao && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.descricao.message}{" "}
          </span>
        )}
        <Input
          style={{ outline: errors.foto ? "2px solid red" : "" }}
          className={errors.foto ? styles["input-erro"] : ""}
          {...register("foto", {
            required: "O campo url da foto é obrigatório!",
          })}
          placeholder="Url da foto do produto"
          alt="url da foto do produto"
        />
        {errors.foto && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.foto.message}{" "}
          </span>
        )}
        <select
          className={errors.categoria ? styles["input-erro"] : ""}
          {...register("categoria", {
            required: "O campo categorias é obrigatório!",
          })}
          disabled={nomeCategoria}
        >
          <option value={""} disabled>
            Selecione uma categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.categoria.message}{" "}
          </span>
        )}
        <Input
          style={{ outline: errors.preco ? "2px solid red" : "" }}
          className={errors.preco ? styles["input-erro"] : ""}
          {...register("preco", {
            required: "O campo preço é obrigatório!",
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Preço do produto"
          alt="preço do produto"
        />
        {errors.preco && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.preco.message}{" "}
          </span>
        )}
        <Button type={"submit"}>Cadastrar produto</Button>
      </form>
    </div>
  );
}
