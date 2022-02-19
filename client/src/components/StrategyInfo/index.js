import './StrategyInfo.scss';
import Strategy from './Strategy';

export default function StrategyInfo({ data }) {
  // Organize and manipulate data
  

  return (
    <section className="full-container">
      <Strategy data={data}/>
    </section>
  );
}