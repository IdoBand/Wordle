import { flexCenter } from "../_mixin";
import { Tile } from "../interface"


interface TilesProps {
 tiles: Tile[]
}
export default function Tiles({tiles}: TilesProps) {
      return (
      <>
        {tiles.map((tile: Tile) => 
         <div 
            key={tile.id.toString()}
            className={`
                ${flexCenter}
                w-10 h-10 text-light text-xl shadow-md shadow-black
                border border-solid border-black rounded-md
                ${tile.className}`} 
            id={tile.id.toString()} 
               >{tile.content}
        </div>
        ) }
      </>
           
      );
    }
