import { RuleListItem } from "../RuleListItem/RuleListItem"

export const RuleList = ({items, onClick}) => {
    
    return (
        <div>
            {items.map((item, idx) => {
                return <RuleListItem key={item.key} id={idx} index={idx} item={item}/>
            })}
        </div>
    )
}