import React, { useCallback, useState } from "react";

// Upstage AI API 지원 받기 신청해서 받은 api key
const API_KEY = "";

const App: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("PDF 파일을 드래그하세요");

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file || file.type !== "application/pdf") {
      setStatus("PDF 파일만 올려주세요 ⚠️");
      return;
    }

    setFileName(file.name);
    setStatus("업로드 중... 🚀");
  
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

      const uploadFormData = new FormData();
      uploadFormData.append("text", fileText);

      const res = await fetch("https://example.com/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        setStatus("업로드 완료 ✅");
      } else {
        setStatus("업로드 실패 ❌");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f2f2f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "3px dashed #aaa",
        color: "#333",
        fontFamily: "sans-serif",
      }}
    >
      <h1>{status}</h1>
      {fileName && <p>파일: {fileName}</p>}
    </div>
  );
};

export default App;