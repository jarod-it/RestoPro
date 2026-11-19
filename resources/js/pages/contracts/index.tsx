import { Head } from '@inertiajs/react';
import ContractSearchScreen from '@/components/screens/contracts/contract-search-screen';
import type {
    ContractOffersPage,
    ContractSearchFilters,
    ContractTypeOption,
} from '@/types';

type Props = {
    offers: ContractOffersPage;
    filters: ContractSearchFilters;
    cities: string[];
    types: ContractTypeOption[];
};

export default function ContractsIndex(props: Props) {
    return (
        <>
            <Head title="Contrats en restauration" />
            <ContractSearchScreen {...props} />
        </>
    );
}
