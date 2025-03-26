import { RuleItemTile } from "../RuleItemTile/RuleItemTile"

export const RuleListItem = ({id, index, item}) => {
    return (
        <div key={item.key} style={{display: 'flex', width: '100%', margin: '8px 0px', alignItems: 'center'}}>
                <div style={{margin: '0 8px 0 16px'}}>{index + 1}</div>
                <RuleItemTile rule={item} ruleKey={item.key}/>
            </div>
    )
}