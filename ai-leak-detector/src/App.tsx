import React, { useCallback, useState } from "react";

// Upstage AI API 지원 받기 신청해서 받은 api key
const API_KEY = "";

const App: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("PDF 파일을 드래그하세요");
  const [resultText, setResultText] = useState<string>("");

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file || file.type !== "application/pdf") {
      setStatus("PDF 파일만 올려주세요 ⚠️");
      return;
    }

    setFileName(file.name);
    setStatus("분석 중... 🚀");
  
    try {
      // 업로드한 파일의 텍스트 추출
      const parseFormData = new FormData();
      parseFormData.append("document", file);
      parseFormData.append("output_formats", JSON.stringify(["html", "text"]));
      parseFormData.append("base64_encoding", JSON.stringify(["table"]));
      parseFormData.append("ocr", "auto");
      parseFormData.append("coordinates", "true");
      parseFormData.append("model", "document-parse");

      const response = await fetch(
        "https://api.upstage.ai/v1/document-digitization",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${API_KEY}` },
          body: parseFormData,
        }
      );

      const responseJson = await response.json();
      const fileText = responseJson.content.text;
      console.log(fileText)
      //

      // 결과값을 임시로 추출된 텍스트 표시
      setResultText(fileText);

      const uploadFormData = new FormData();
      uploadFormData.append("text", fileText);

      const res = await fetch("https://example.com/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        setStatus("분석 완료 ✅");
      } else {
        setStatus("분석 실패 ❌");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div style={{ width: "100vw", height: "100vh", fontFamily: "sans-serif" }}>
      <header style={{ padding: "20px", textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>
        개인정보 유출 탐지
      </header>
      <div style={{ display: "flex", height: "calc(100vh - 85px)" }}>
        {/* pdf 업로드 창 */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            flex: 1,
            margin: "20px",
            border: "3px dashed #aaa",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#fafafa",
            textAlign: "center",
          }}
        >
          <h2>{status}</h2>
          {fileName && <p>파일: {fileName}</p>}
        </div>
        {/* 분석 결과 창 */}
        <div
          style={{
            flex: 1,
            margin: "20px",
            border: "3px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            background: "white",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {resultText}
        </div>
      </div>
    </div>
  );
};

export default App;