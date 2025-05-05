const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Nome do Produto", flex: 1 },
    {
      field: "price",
      headerName: "Preço",
      flex: 1,
      valueFormatter: (params) =>{
        if (params){
            const number = Number(params);
            return `R$ ${number.toFixed(2)}`.replace(".", ",")
        }
      },
    },
    { field: "quantity", headerName: "Quantidade", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 1.5 },
];

export default columns;