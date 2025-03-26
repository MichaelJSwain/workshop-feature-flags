import { RuleListItem } from "../RuleListItem/RuleListItem"

export const RuleList = ({items, onClick}) => {
    
    return (
        <div>
            {items.map((item, idx) => {
                return <RuleListItem id={idx} index={idx} item={item}/>
            })}
        </div>
    )
}