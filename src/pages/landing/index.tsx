import { TextRotator } from "./components/text-rotator";

export default function Landing() {
  return (
    <div className="landing flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="display">
        <TextRotator
          words="Real work,Advanced analysis,Repetitive tasks,Deep research,Meeting prep,Data insights"
          speed={1200}
        />
        ,{"\n"}done with&nbsp;AI
      </h1>
    </div>
  );
}
