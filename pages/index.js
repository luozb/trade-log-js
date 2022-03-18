import Head from 'next/head';
import Layout, { siteTitle } from "../components/layout";
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from 'next/link';


export default function Home() {
  const [page, setPage] = useState(1);
  const [logData, setLogData] = useState(null);
  const handlePageChange = (event, value) => {
    setPage(value);
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/tradeLogList?page=" + value + "&limit=5")
      .then((res) => res.json())
      .then((data) => setLogData(data));
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/tradeLogList")
      .then((res) => res.json())
      .then((data) => setLogData(data))
  }, [])

  if (!logData) return <Layout>Loading...</Layout>;

  return (
    <Layout home>
      <Head>{siteTitle}</Head>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">平台</TableCell>
              <TableCell align="right">市场</TableCell>
              <TableCell align="right">交易标识</TableCell>
              <TableCell align="right">多空</TableCell>
              <TableCell align="right">入场日期</TableCell>
              <TableCell align="right">出场日期</TableCell>
              <TableCell align="right">交易盈亏比</TableCell>
              <TableCell align="right">交易盈亏</TableCell>
              <TableCell align="right">交易等级</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logData.result.list.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.platform}</TableCell>
                <TableCell align="right">{row.market}</TableCell>
                <TableCell align="right">{row.symbol}</TableCell>
                <TableCell align="right" style={{ backgroundColor: (row.long_short == 'long' ? 'rgb(14 203 129)' : 'rgb(246 70 93)'), border: '0px', color: 'white' }} >{row.long_short}</TableCell>
                <TableCell align="right">{row.entry_date}</TableCell>
                <TableCell align="right">{row.exit_date}</TableCell>
                <TableCell align="right">{row.gain_loss_rate * 100 + '%'}</TableCell>
                <TableCell align="right" style={{ backgroundColor: (row.gain_loss > 0 ? 'rgb(14 203 129)' : 'rgb(246 70 93)'), border: '0px', color: 'white' }}>{row.gain_loss}</TableCell>
                <TableCell align="right">{row.trade_grade * 100 + '%'}</TableCell>
                <TableCell align="right">
                  <Link href={"/detail?id=" + row.id}>详情</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack spacing={2}>
          <Pagination style={{ marginTop: '16px', marginBottom: '16px' }} count={(logData.result.total % 5) + 1} page={page} onChange={handlePageChange} />
        </Stack>
      </TableContainer>
    </Layout>
  )
}
