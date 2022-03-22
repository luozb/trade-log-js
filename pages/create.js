import React from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Link from "next/link";
import axios from 'axios';

const BodyDiv = styled.div`
  padding: 5px;
  border: 1px solid #ccc;
`;
const ReasonMin = styled.div`
  padding: 15px;
  width: 49%;
  border: 1px solid rgba(224, 224, 224, 1);
  margin-bottom: 15px;
  float: left;
`;

const TableTh2 = styled.th`
  text-align: left;
`;

const TextInput = styled.input`
  height: 25px;
  width: 140px;
  border: 1px solid rgba(224, 224, 224, 1);
  margin-left: 2px;
`;

const Title = styled.div`
  font-size: 1.2em;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Reason = styled.div`
  padding: 15px;
  border: 1px solid rgba(224, 224, 224, 1);
  margin-bottom: 15px;
`;




export default function Create() {
  const [platform, setPlatform] = React.useState(null);
  const [market, setMarket] = React.useState(null);
  const [symbol, setSymbol] = React.useState(null);
  const [longShort, setLongShort] = React.useState(null);

  const [entryReason, setEntryReason] = React.useState(null);
  const [leftFile, setLeftFile] = React.useState(null);
  const [rightFile, setRightFile] = React.useState(null);

  const [entryOrderId, setEntryOrderId] = React.useState(null);
  const [entryDate, setEntryDate] = React.useState(null);
  const [entrySide, setEntrySide] = React.useState(null);
  const [entryPrice, setEntryPrice] = React.useState(null);
  const [entrySize, setEntrySize] = React.useState(null);
  const [entryTotal, setEntryTotal] = React.useState(null);
  const [entryDaysHigh, setEntryDaysHigh] = React.useState(null);
  const [entryDaysLow, setEntryDaysLow] = React.useState(null);

  const [exitOrderId, setExitOrderId] = React.useState(null);
  const [exitDate, setExitDate] = React.useState(null);
  const [exitSide, setExitSide] = React.useState(null);
  const [exitPrice, setExitPrice] = React.useState(null);
  const [exitSize, setExitSize] = React.useState(null);
  const [exitTotal, setExitTotal] = React.useState(null);
  const [exitDaysHigh, setExitDaysHigh] = React.useState(null);
  const [exitDaysLow, setExitDaysLow] = React.useState(null);

  const [exitReason, setExitReason] = React.useState(null);
  const [exitLeftFile, setExitLeftFile] = React.useState(null);
  const [exitRightFile, setExitRightFile] = React.useState(null);

  const [tradeAnalysis, setTradeAnalysis] = React.useState(null);
  const [tradeAnalysisImg, setTradeAnalysisImg] = React.useState(null);



  return (
    <Layout>
      <BodyDiv>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ReasonMin>
            <table>
              <thead style={{ fontSize: '16px' }}>
                <tr>
                  <TableTh2>平台</TableTh2>
                  <TableTh2>市场</TableTh2>
                  <TableTh2>交易对</TableTh2>
                  <TableTh2>多空</TableTh2>
                </tr>
              </thead>
              <tbody style={{ width: '100%' }}>
                <tr>
                  <td><TextInput onChange={e => setPlatform(e.target.value)} /></td>
                  <td><TextInput onChange={e => setMarket(e.target.value)} /></td>
                  <td><TextInput onChange={e => setSymbol(e.target.value)} /></td>
                  <td><TextInput onChange={e => setLongShort(e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
          </ReasonMin>
          <ReasonMin style={{ float: 'right' }}>
            <div>
              <Title>入场原因</Title>
              <textarea style={{ width: '100%', height: '100px' }} onChange={e => setEntryReason(e.target.value)}></textarea>
            </div>
            <div style={{ padding: '10px' }}>
              <input id="avatarFor1" style={{ display: 'none' }} type="file" onChange={e => setLeftFile(e.target.files[0])} />
              <input id="avatarFor2" style={{ display: 'none' }} type="file" onChange={e => setRightFile(e.target.files[0])} />
              {/* {imagePreview} */}
              <label style={{ color: "#1890FF", cursor: 'pointer', border: "1px dashed #1890FF", padding: '3px 10px ', marginRight: '20px' }} htmlFor="avatarFor1">+点击上传图片</label>
              <label style={{ color: "#1890FF", cursor: 'pointer', border: "1px dashed #1890FF", padding: '3px 10px ' }} htmlFor="avatarFor2">+点击上传图片</label>
            </div>
          </ReasonMin>
        </div>
        <Reason>
          <Title>入场 & 出场</Title>
          <table>
            <thead style={{ fontSize: '16px' }}>
              <tr>
                <TableTh2>订单ID</TableTh2>
                <TableTh2>日期</TableTh2>
                <TableTh2>方向</TableTh2>
                <TableTh2>价格</TableTh2>
                <TableTh2>成交数量</TableTh2>
                <TableTh2>成交额</TableTh2>
                <TableTh2>数日最高价格</TableTh2>
                <TableTh2>数日最低价格</TableTh2>
              </tr>
            </thead>
            <tbody style={{ width: '100%' }}>
              <tr></tr>
              <tr><td>入场 [<Link href="/trade-log/create"><a>添加入场</a></Link>]</td></tr>
              <tr>
                <td><TextInput onChange={e => setEntryOrderId(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntryDate(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntrySide(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntryPrice(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntrySize(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntryTotal(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntryDaysHigh(e.target.value)} /></td>
                <td><TextInput onChange={e => setEntryDaysLow(e.target.value)} /></td>
              </tr>
              <tr><td>出场 [<Link href="/trade-log/create"><a>添加出场</a></Link>]</td></tr>
              <tr>
                <td><TextInput onChange={e => setExitOrderId(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitDate(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitSide(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitPrice(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitSize(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitTotal(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitDaysHigh(e.target.value)} /></td>
                <td><TextInput onChange={e => setExitDaysLow(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
        </Reason>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ReasonMin>
            <Title>出场原因</Title>
            <textarea style={{ width: '100%', height: '100px' }} onChange={e => setExitReason(e.target.value)}></textarea>
            <div style={{ padding: '10px' }}>
              <input id="avatarFor3" style={{ display: 'none' }} type="file" onChange={e => setExitLeftFile(e.target.files[0])} />
              <input id="avatarFor4" style={{ display: 'none' }} type="file" onChange={e => setExitRightFile(e.target.files[0])} />
              {/* {imagePreview} */}
              <label style={{ color: "#1890FF", cursor: 'pointer', border: "1px dashed #1890FF", padding: '3px 10px ', marginRight: '20px' }} htmlFor="avatarFor3">+点击上传图片</label>
              <label style={{ color: "#1890FF", cursor: 'pointer', border: "1px dashed #1890FF", padding: '3px 10px ' }} htmlFor="avatarFor4">+点击上传图片</label>
              {/* {ShowLargeImg(data.result.exit_img1)}
              {ShowLargeImg(data.result.exit_img2)} */}
            </div>
          </ReasonMin>
          <ReasonMin style={{ float: 'right' }}>
            <Title>交易分析</Title>
            <textarea style={{ width: '100%', height: '100px' }} onChange={e => setTradeAnalysis(e.target.value)} ></textarea>
            <div style={{ padding: '10px' }}>
              {/* {ShowLargeImg(data.result.post_trade_analysis_img)} */}
              <input id="avatarFor5" style={{ display: 'none' }} type="file" onChange={e => setTradeAnalysisImg(e.target.files[0])} />
              <label style={{ color: "#1890FF", cursor: 'pointer', border: "1px dashed #1890FF", padding: '3px 10px ', marginRight: '20px' }} htmlFor="avatarFor5">+点击上传图片</label>
            </div>
          </ReasonMin>
        </div>
        <div>
          <button style={{ display: 'block', width: '100px', height: '40px', cursor: 'pointer', background: 'rgb(24, 144, 255)', color: 'white', border: 'rgb(24, 144, 255)', borderRadius: '2px', margin: '0 auto' }}
            onClick={async () => {
              const formData = new FormData();
              formData.append("platform", platform);
              formData.append("market", market);
              formData.append("symbol", symbol);
              formData.append("longShort", longShort);

              formData.append("entryReason", entryReason);
              formData.append("leftFile", leftFile);
              formData.append("rightFile", rightFile);

              formData.append("entryOrderId", entryOrderId);
              formData.append("entryDate", entryDate);
              formData.append("entrySide", entrySide);
              formData.append("entryPrice", entryPrice);
              formData.append("entrySize", entrySize);
              formData.append("entryTotal", entryTotal);
              formData.append("entryDaysHigh", entryDaysHigh);
              formData.append("entryDaysLow", entryDaysLow);

              formData.append("exitOrderId", exitOrderId);
              formData.append("exitDate", exitDate);
              formData.append("exitSide", exitSide);
              formData.append("exitPrice", exitPrice);
              formData.append("exitSize", exitSize);
              formData.append("exitTotal", exitTotal);
              formData.append("exitDaysHigh", exitDaysHigh);
              formData.append("exitDaysLow", exitDaysLow);

              formData.append("exitReason", exitReason);
              formData.append("exitLeftFile", exitLeftFile);
              formData.append("exitRightFile", exitRightFile);

              formData.append("tradeAnalysis", tradeAnalysis);
              formData.append("tradeAnalysisImg", tradeAnalysisImg);

              console.log(platform)

              axios
                .post(process.env.NEXT_PUBLIC_BASE_URL + "/createTradeLog", formData)
                .then((res) => {
                  console.log(res);
                  alert("File Upload success");
                })
                .catch((err) => {
                  console.log(err);
                  alert("File Upload Error");
                });
            }}>提交</button>
        </div>
      </BodyDiv >

    </Layout >
  );
}