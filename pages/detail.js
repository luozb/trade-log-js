import React, { useState } from 'react';
import Layout from "../components/layout";
import { useRouter } from 'next/router';
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

const BodyDiv = styled.div`
  padding: 5px;
  border: 1px solid #ccc;
`;

const Reason = styled.div`
  padding: 15px;
  border: 1px solid rgba(224, 224, 224, 1);
  margin-bottom: 15px;
`;

const ReasonMin = styled.div`
  padding: 15px;
  width: 49%;
  border: 1px solid rgba(224, 224, 224, 1);
  margin-bottom: 15px;
  float: left;
`;

const Title = styled.div`
  font-size: 1.2em;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TextArea = styled.div`
  padding: 15px;
  font-size: 16px;
  width: 100%;
  height: 100px;
  border: 1px solid rgba(224, 224, 224, 1);
`;

const ChartImg = styled.img`
  width: 100px;
  display: inline;
  cursor: pointer;
  margin: 10px;
`;

const ChartLargeDiv = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
`;

const ChartLargeImg = styled.img`
  margin: auto;
  display: block;
  width: 100%;
  max-width: 800px;
  cursor: pointer;
`;

const LeftChart = styled.div`
  font-size: 16px;
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const UploadFile = styled.input`
  margin-left: 0px;
`;

const TextInput = styled.input`
  height: 25px;
  width: 140px;
  border: 1px solid rgba(224, 224, 224, 1);
  margin-left: 2px;
`;

const TableTh = styled.th`
  text-align: left;
`;

const Span = styled.span`
  font-size: 16px;
`;

const StrategySelect = styled.select`
  display:block;
  height:32px;
  line-height:32px;
  font-size:14px;
  width:300px;
  margin:20px auto;
`;

const TopImg = styled.img`
  position: absolute;
  left:50%;
  top:50%;
  z-index：9999;
`;

export default function Detail() {
  const [showImg, setShowImg] = useState(false);
  const handleShowImg = (value) => {
    setShowImg(value);
    // console.log(value);
  };
  function ShowLargeImg(src) {

    if (!src) {
      return (
        <div>No Img</div>
      );
    }

    if (showImg) {
      return (
        <ChartLargeDiv>
          <ChartLargeImg onClick={() => handleShowImg(false)} src={process.env.NEXT_PUBLIC_BASE_URL + `/images/${src}`} />
        </ChartLargeDiv>
      );
    }

    return (
      <ChartImg onClick={() => handleShowImg(true)} src={process.env.NEXT_PUBLIC_BASE_URL + `/images/${src}`} />
    );
  }
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && process.env.NEXT_PUBLIC_BASE_URL + `/tradeLogInfo?id=${query.id}`,
    fetcher
  )

  if (error) return <Layout>{error.message}</Layout>;
  if (!data) return <Layout>Loading...</Layout>;

  if (!data.result) return <Layout>No Rows</Layout>;


  return (
    <Layout>
      <BodyDiv>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ReasonMin>
            <table>
              <thead style={{ fontSize: '16px' }}>
                <tr>
                  <TableTh>平台</TableTh>
                  <TableTh>市场</TableTh>
                  <TableTh>交易对</TableTh>
                  <TableTh>多空</TableTh>
                </tr>
              </thead>
              <tbody style={{ width: '100%' }}>
                <tr>
                  <td><TextInput value={data.result.platform} disabled /></td>
                  <td><TextInput value={data.result.market} disabled /></td>
                  <td><TextInput value={data.result.symbol} disabled /></td>
                  <td><TextInput value={data.result.long_short} disabled style={{ backgroundColor: (data.result.long_short == 'long' ? 'rgb(14 203 129)' : 'rgb(246 70 93)'), border: '0px', color: 'white' }} /></td>
                </tr>
              </tbody>
            </table>
          </ReasonMin>
          <ReasonMin style={{ float: 'right' }}>
            <Title>入场原因</Title>
            <TextArea>{data.result.entry_reason}</TextArea>
            <div style={{ padding: '10px' }}>
              {ShowLargeImg(data.result.entry_img1)}
              {ShowLargeImg(data.result.entry_img2)}
            </div>
          </ReasonMin>
        </div>
        <Reason>
          <Title>入场 & 出场</Title>
          <table>
            <thead style={{ fontSize: '16px' }}>
              <tr>
                <TableTh>订单ID</TableTh>
                <TableTh>日期</TableTh>
                <TableTh>方向</TableTh>
                <TableTh>价格</TableTh>
                <TableTh>成交数量</TableTh>
                <TableTh>成交额</TableTh>
                <TableTh>数日最高价格</TableTh>
                <TableTh>数日最低价格</TableTh>
                <TableTh>等级</TableTh>
              </tr>
            </thead>
            <tbody style={{ width: '100%' }}>
              <tr></tr>
              <tr><td>入场 [<Link href="/trade-log/create"><a>添加入场</a></Link>]</td></tr>
              <tr>
                <td><TextInput value={data.result.entry_order_id} disabled /></td>
                <td><TextInput value={data.result.entry_date} disabled /></td>
                <td><TextInput value={data.result.entry_order_side} disabled style={{ backgroundColor: (data.result.entry_order_side == 'buy' ? 'rgb(14 203 129)' : 'rgb(246 70 93)'), border: '0px', color: 'white' }} /></td>
                <td><TextInput value={data.result.entry_price} disabled /></td>
                <td><TextInput value={data.result.entry_size} disabled /></td>
                <td><TextInput value={data.result.entry_total} disabled /></td>
                <td><TextInput value={data.result.entry_days_high} disabled /></td>
                <td><TextInput value={data.result.entry_days_low} disabled /></td>
                <td><TextInput value={data.result.entry_grade * 100 + '%'} disabled /></td>
              </tr>
              <tr><td>出场 [<Link href="/trade-log/create"><a>添加出场</a></Link>]</td></tr>
              <tr>
                <td><TextInput value={data.result.exit_order_id} disabled /></td>
                <td><TextInput value={data.result.exit_date} disabled /></td>
                <td><TextInput value={data.result.exit_order_side} disabled style={{ backgroundColor: (data.result.exit_order_side == 'buy' ? 'rgb(14 203 129)' : 'rgb(246 70 93)'), border: '0px', color: 'white' }} /></td>
                <td><TextInput value={data.result.exit_price} disabled /></td>
                <td><TextInput value={data.result.exit_size} disabled /></td>
                <td><TextInput value={data.result.exit_total} disabled /></td>
                <td><TextInput value={data.result.exit_days_high} disabled /></td>
                <td><TextInput value={data.result.exit_days_low} disabled /></td>
                <td><TextInput value={data.result.exit_grade * 100 + '%'} disabled /></td>
              </tr>
              <tr><td>结果：</td></tr>
              <tr style={{ fontSize: '16px' }}>
                <TableTh>盈亏百分比 %</TableTh>
                <TableTh>盈亏</TableTh>
                <TableTh>交易等级</TableTh>
              </tr>
              <tr>
                <td><TextInput value={data.result.gain_loss_rate * 100 + '%'} disabled /></td>
                <td><TextInput value={data.result.gain_loss} disabled style={{ backgroundColor: (data.result.gain_loss > 0 ? 'rgb(14 203 129)' : 'rgb(246 70 93)'), border: '0px', color: 'white' }} /></td>
                <td><TextInput value={data.result.trade_grade * 100 + '%'} disabled /></td>
              </tr>
              {/* <tr style={{ fontSize: '16px' }}>
                <TableTh>入场日期</TableTh>
                <TableTh>出场日期</TableTh>
                <TableTh>成交份数</TableTh>
                <TableTh>平均入场价格</TableTh>
                <TableTh>平均出场价格</TableTh>
                <TableTh>盈亏百分比 %</TableTh>
                <TableTh>盈亏</TableTh>
              </tr>
              <tr>
                <td><TextInput value={data.result.entry_date} disabled /></td>
                <td><TextInput value={data.result.exit_date} disabled /></td>
                <td><TextInput value={data.result.entry_filled_shares} disabled /></td>
                <td><TextInput value={data.result.entry_filled_priced} disabled /></td>
                <td><TextInput value={data.result.exit_filled_priced} disabled /></td>
                <td><TextInput value={data.result.gain_loss_rate * 100 + '%'} disabled /></td>
                <td><TextInput value={data.result.gain_loss} disabled /></td>
              </tr> */}
            </tbody>
          </table>
        </Reason>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ReasonMin>
            <Title>出场原因</Title>
            <TextArea>{data.result.exit_reason}</TextArea>
            <div style={{ padding: '10px' }}>
              {ShowLargeImg(data.result.exit_img1)}
              {ShowLargeImg(data.result.exit_img2)}
            </div>
          </ReasonMin>
          <ReasonMin style={{ float: 'right' }}>
            <Title>交易分析</Title>
            <TextArea>{data.result.post_trade_analysis}</TextArea>
            <div style={{ padding: '10px' }}>
              {ShowLargeImg(data.result.post_trade_analysis_img)}
            </div>
          </ReasonMin>
        </div>
      </BodyDiv>
    </Layout >
  );
}