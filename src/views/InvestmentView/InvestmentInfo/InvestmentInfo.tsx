import React, {useContext, useEffect, useState} from 'react';
import {RadioPeriodSelector} from '../../../components/RadioPeriodSelector/RadioPeriodSelector';
import {RangeInput} from '../../../components/RangeInput/RangeInput';
import {Separator} from '../../../components/Separator/Separator';
import {CurrencyContext} from '../InvestmentView';
import {InvestmentParameters, InvestmentResultTypes} from '../InvestmentView.types';
import {InvestmentResults} from './InvestmentResults';

interface Props {
    parameters: InvestmentParameters;
    setParameters: React.Dispatch<React.SetStateAction<InvestmentParameters>>;
    results: InvestmentResultTypes;
}

export const InvestmentInfo: React.FC<Props> = ({parameters, setParameters, results}) => {
    const currencyContext = useContext(CurrencyContext);

    const [initialDeposit, setInitialDeposit] = useState(parameters.initialDeposit);
    const [systematicDeposit, setSystematicDeposit] = useState(parameters.systematicDeposit);
    const [frequency, setFrequency] = useState(parameters.frequency);
    const [frequencyUnit, setFrequencyUnit] = useState(parameters.frequencyUnit);
    const [duration, setDuration] = useState(parameters.duration);
    const [durationUnit, setDurationUnit] = useState(parameters.durationUnit);
    const [ROE, setROE] = useState(parameters.ROE);

    useEffect(() => {
        setParameters({
            initialDeposit: initialDeposit,
            systematicDeposit: systematicDeposit,
            frequency: frequency,
            frequencyUnit: frequencyUnit,
            duration: duration,
            durationUnit: durationUnit,
            ROE: ROE,
        });
    }, [setParameters, initialDeposit, systematicDeposit, frequency, frequencyUnit, duration, durationUnit, ROE]);

    return (
        <>
            <Separator text="Results" />
            <InvestmentResults
                annualChangePercent={results.annualChangePercent}
                annualChange={results.annualChange}
                totalChangePercent={results.totalChangePercent}
                totalChange={results.totalChange}
                predictedChange={results.predictedChange}
            />
            <Separator text="Parameters" />
            <RangeInput
                minValue={0}
                maxValue={4000}
                label="initial deposit"
                unit={currencyContext}
                value={initialDeposit}
                setValue={setInitialDeposit}
            />
            <RangeInput
                minValue={0}
                maxValue={100}
                label="systematic deposit"
                unit={currencyContext}
                value={systematicDeposit}
                setValue={setSystematicDeposit}
            />
            <RangeInput
                minValue={0}
                maxValue={4}
                label="frequency"
                label2="every"
                unit={frequencyUnit}
                value={frequency}
                setValue={setFrequency}
            />
            <RadioPeriodSelector periodUnit={frequencyUnit} setPeriodUnit={setFrequencyUnit} />
            <RangeInput
                minValue={0}
                maxValue={10}
                label="duration"
                label2="for"
                unit={durationUnit}
                value={duration}
                setValue={setDuration}
            />
            <RadioPeriodSelector periodUnit={durationUnit} setPeriodUnit={setDurationUnit} />
            <RangeInput minValue={0} maxValue={100} label="ROE" unit="%" value={ROE} setValue={setROE} />
        </>
    );
};
