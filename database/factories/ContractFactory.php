<?php

namespace Database\Factories;

use App\Enums\ContractType;
use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contract>
 */
class ContractFactory extends Factory
{
    /**
     * @var list<string>
     */
    protected array $roles = [
        'Chef de rang', 'Commis de cuisine', 'Second de cuisine', 'Plongeur',
        'Barista', 'Serveur en salle', 'Chef de partie', 'Maitre d hotel',
        'Barman', 'Patissier', 'Runner', 'Responsable de salle',
    ];

    /**
     * @var list<string>
     */
    protected array $houses = [
        'Le Comptoir Saint-Denis', 'Brasserie Mont-Royal', 'Table du Vieux-Port',
        'Maison Lavoisier', 'Le Jardin d Hiver', 'Cantine Nord',
        'Bistrot Sainte-Anne', 'Atelier Rosemont', 'La Verriere',
        'Chez Mathis', 'Le Quai 9', 'Auberge des Trembles',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startsOn = fake()->dateTimeBetween('now', '+3 months');
        $type = fake()->randomElement(ContractType::cases());

        return [
            'title' => fake()->randomElement($this->roles),
            'restaurant_name' => fake()->randomElement($this->houses),
            'city' => fake()->randomElement([
                'Montréal', 'Québec', 'Laval', 'Gatineau', 'Longueuil',
                'Sherbrooke', 'Trois-Rivières', 'Lévis', 'Saguenay',
                'Terrebonne',
            ]),
            'description' => fake()->paragraph(3),
            'hourly_rate' => fake()->randomFloat(2, 16.1, 32),
            'contract_type' => $type,
            'weekly_hours' => fake()->randomElement([15, 20, 25, 30, 35, 40]),
            'starts_on' => $startsOn,
            'ends_on' => $type === ContractType::Cdi
                ? null
                : fake()->dateTimeBetween($startsOn, '+9 months'),
            'image_seed' => fake()->unique()->bothify('resto-####-??????'),
            'published_at' => fake()->dateTimeBetween('-2 months', 'now'),
        ];
    }

    /**
     * Indicate that the offer is still a draft.
     */
    public function unpublished(): static
    {
        return $this->state(fn (array $attributes): array => [
            'published_at' => null,
        ]);
    }

    /**
     * Indicate the contract type of the offer.
     */
    public function ofType(ContractType $type): static
    {
        return $this->state(fn (array $attributes): array => [
            'contract_type' => $type,
            'ends_on' => $type === ContractType::Cdi ? null : $attributes['ends_on'],
        ]);
    }
}
