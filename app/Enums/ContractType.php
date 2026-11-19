<?php

namespace App\Enums;

enum ContractType: string
{
    case Extra = 'extra';
    case Saisonnier = 'saisonnier';
    case Cdd = 'cdd';
    case Cdi = 'cdi';
    case Apprentissage = 'apprentissage';

    public function label(): string
    {
        return match ($this) {
            self::Extra => 'Extra',
            self::Saisonnier => 'Saisonnier',
            self::Cdd => 'CDD',
            self::Cdi => 'CDI',
            self::Apprentissage => 'Apprentissage',
        };
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $type): array => ['value' => $type->value, 'label' => $type->label()],
            self::cases(),
        );
    }
}
