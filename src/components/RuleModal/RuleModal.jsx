import { useContext, useRef, useState } from "react"
import { Modal } from "../Modal/Modal"
import { RuleForm } from "../RuleForm/RuleForm"
import { DetailViewContext } from "../../FlagDetailViewContext"
import { MultiStepForm } from "../MultiStepForm/MultiStepForm"
import { RuleOverviewForm } from "../RuleOverviewForm/RuleOverviewForm"
import { RuleTrafficForm } from "../RuleTrafficForm/RuleTrafficForm"
import { RuleVariationsForm } from "../RuleVariationsForm/RuleVariationsForm"

// const emptyRule = {
//     name: '',
//     key: '',
//     description: '',
//     hypothesis: '',
//     percentage_included: 100,
//     variations: [
//       { name: 'Control', key: 1, variation_id: 2348324, percentage_included: 5000 },
//       { name: 'Variation 1', key: 2, variation_id: 2834908, percentage_included: 50000 }
//     ]
//   }

export const RuleModal = ({closeModal, selectedRule = null}) => {
    const [buttonText, setButtonText] = useState("Next");
    const {addRule, onRuleUpdate} = useContext(DetailViewContext);
    const formRef = useRef();

     console.log("selected rule = ", selectedRule);

    const handleModalSubmit = () => {
        const result = formRef.current.handleStepOrSubmit();
        if (result?.isLastStep) {
            setButtonText("Save");
        } else if (result?.hasSubmitted) {
            closeModal();
        }
    }

    const updateRule = (rule) => {
        const updatedRule = {...selectedRule, ...rule};
        onRuleUpdate(updatedRule);
    }

    const createRule = (rule) => {
        console.log("creating rule");
        addRule(rule);
    }

    return (
        <Modal submitFunc={handleModalSubmit} closeFunc={closeModal} header="Add rule" cta={buttonText}>
            {/* <RuleForm ref={formRef} initialValues={selectedRule || emptyRule} submitFunc={selectedRule ? updateRule : createRule}></RuleForm> */}
            <MultiStepForm ref={formRef} submitFunc={selectedRule ? updateRule : createRule}>
                <RuleOverviewForm initialValues={selectedRule ? {name: selectedRule.name, key: selectedRule.key} : null}></RuleOverviewForm>
                <RuleTrafficForm initialValues={selectedRule ? selectedRule.percentage_included : null}></RuleTrafficForm>
                <RuleVariationsForm initialValues={selectedRule ? {variations: selectedRule?.variations} : null}></RuleVariationsForm>
            </MultiStepForm>
        </Modal>
    )
}