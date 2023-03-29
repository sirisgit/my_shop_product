import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ItemCard from './itemCard';
import { ownerDocument } from '@mui/material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popupstyle.css';


const columns = [
  { id: 'thumbnail', label: 'Image', minWidth: 170 },
  { id: 'title', label: 'Name', minWidth: 150 },
  {
    id: 'stock',
    label: 'Stock',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'view',
    label: '',
    minWidth: 50,
  },
];

const PopupExample = () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);

export default function DataTableTest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [showItemCard, setCardStatus] = React.useState(false);
  const [cardData, setCardData] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if(!dataLoaded){
    fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((res) => {
    console.log(res['products']);
    setRows(res['products']);
    setDataLoaded(true);
    })
}

const handleCardData = (row) =>{
    setCardData(row);
    setCardStatus(true);
}

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <input type="text" placeholder='search here' className="d-flex flex-row justify-content-end"/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(rows)}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  //   <TableRow hover role="checkbox" tabIndex={-1} key={row.title} onClick={handleCardData(row)}>
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title} onClick={() => handleCardData(row)}>
                    <TableCell><img src={row.thumbnail} width="150px" height="80px" /></TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell align="right"><span style={{ 'color': row.stock > 0 ? 'green' : 'red' }}>{row.stock}</span></TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                    <TableCell align="right">
                      <span>Our Price: {row.price - (row.price * row.discountPercentage / 100)}</span>
                      <br></br>
                      <span style={{ 'text-decoration': "line-through" }}>MRP: {row.price}</span>
                    </TableCell>
                    {/* <TableCell><button>View</button></TableCell> */}
                    <TableCell><Popup height='500px' trigger=
                {<button> View </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                              <div>
                                <marquee>
                                {row.images.map((imgpath)=>{
                                  return(
                                    <img src={imgpath} width="150px" height="80px" style={{'paddingLeft':'20px'}}/>
                                  );
                                })}
                                </marquee>
                              </div>
                                <div style={{'display':'flex','flex-direction':'column'}}>
                                  <span className='popup-spans'>Item Name: {row.title}</span>
                                  <br></br>
                                  <span className='popup-spans'>Brand: {row.brand}</span>
                                  <br></br>
                                  <span className='popup-spans'>{row.description}</span>
                                  <br></br>
                                  <span className='popup-spans'>Our Price: {row.price - (row.price * row.discountPercentage / 100)}</span>
                                </div>
                            </div>
                            <div className='popup-close'>
                                <button onClick=
                                    {() => close()}>
                                        Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper></>
    // <ItemCard row={cardData} isCardShow={showItemCard}/>
  );
}