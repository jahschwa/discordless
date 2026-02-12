import {
	ExternalLink,
	Check,
	AlertTriangle,
	Info,
	Smartphone,
	EyeOff,
	Globe2,
	AlertCircle,
	X,
} from 'lucide-react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { alternatives, type Alternative } from '@/data/alternatives';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const AlternativesSection = () => {
	const popularAlternatives = alternatives.filter(
		(alt) => alt.popularity !== 'less'
	);
	const lessPopularAlternatives = alternatives.filter(
		(alt) => alt.popularity === 'less'
	);

	const featureDefinitions: {
		key: keyof NonNullable<Alternative['discordFeatures']>;
		label: string;
	}[] = [
		{ key: 'textChannel', label: 'Text channels' },
		{ key: 'voiceChannel', label: 'Voice channels' },
		{ key: 'videoChannel', label: 'Video calls' },
		{ key: 'screenSharing', label: 'Screen sharing' },
		{ key: 'customEmojis', label: 'Custom emojis' },
		{ key: 'customRoles', label: 'Custom roles' },
		{ key: 'permissions', label: 'Permissions' },
	];

	const renderFeatureRow = (alt: Alternative) => {
		if (!alt.discordFeatures) return null;

		return (
			<div className='rounded-lg bg-muted/40 p-3'>
				<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
					Discord-like features
				</h4>
				<ul className='space-y-1.5 text-sm'>
					{featureDefinitions.map(({ key, label }) => {
						const raw = alt.discordFeatures?.[key];
						let state: 'supported' | 'planned' | 'missing';

						if (raw === true) {
							state = 'supported';
						} else if (raw === false) {
							state = 'planned';
						} else if (raw === undefined) {
							state = 'missing';
						} else {
							state = 'missing';
						}

						return (
							<li
								key={key}
								className='flex items-start gap-2 text-muted-foreground'
							>
								{state === 'supported' && (
									<Check className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400' />
								)}
								{state === 'planned' && (
									<AlertTriangle className='mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400' />
								)}
								{state === 'missing' && (
									<X className='mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400' />
								)}
								<span>
									{label}
									{state === 'planned' && (
										<span className='ml-1 text-xs text-muted-foreground/80'>
											(in development)
										</span>
									)}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	const getMobileClasses = (value = 'unknown') => {
		switch (value) {
			case 'yes':
				return 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
			case 'no':
				return 'border-red-500/60 bg-red-500/10 text-red-300';
			case 'partial':
				return 'border-amber-500/60 bg-amber-500/10 text-amber-200';
			default:
				return 'border-border/70 bg-muted/40 text-muted-foreground';
		}
	};

	const getNsfwClasses = (value = 'unknown') => {
		switch (value) {
			case 'allowed':
				return 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
			case 'forbidden':
				return 'border-red-500/60 bg-red-500/10 text-red-300';
			case 'mixed':
				return 'border-amber-500/60 bg-amber-500/10 text-amber-200';
			default:
				return 'border-border/70 bg-muted/40 text-muted-foreground';
		}
	};

	return (
		<section
			id='alternatives'
			className='py-20 px-4 sm:px-6 lg:px-8'
		>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-4 flex gap-3 rounded-xl border border-border/70 bg-muted/50 p-4 text-sm text-muted-foreground'>
					<Info className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
					<p>
						Hover over the mobile, NSFW, and origin badges on each card to see
						context about what those icons actually mean for that platform
						(e.g. partial mobile support, instance-specific NSFW rules, or why
						&quot;origin&quot; might not matter for decentralized projects).
					</p>
				</div>

				<div className='mb-8 flex gap-3 rounded-xl border border-amber-500/60 bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-100'>
					<AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-amber-300' />
					<p className='leading-relaxed'>
						Due to how fast this space moves, this overview is mostly
						AI-generated until more people help refine it. Always double-check
						terms of service, privacy policies, and feature claims yourself —
						this site can be wrong or out of date.
					</p>
				</div>

				<div className='mb-12 mt-6 text-center'>
					<h2 className='font-display text-3xl font-bold tracking-tight sm:text-4xl'>
						Popular Discord{' '}
						<span className='bg-gradient-to-r from-electric-blue to-vibrant-purple bg-clip-text text-transparent'>
							Alternatives
						</span>
					</h2>
					<p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>
						A mix of different platforms — some decentralized, some centralized
						— that people are turning to as they look for something less fragile
						than putting everything on Discord.
					</p>
				</div>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{popularAlternatives.map((alt) => {
						const initials = alt.name
							.split(' ')
							.map((word) => word[0])
							.join('')
							.slice(0, 2)
							.toUpperCase();

						const favicon = alt.faviconUrl;

						return (
							<Card
								key={alt.name}
								className='group flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5'
							>
								<CardHeader>
									<div className='flex items-center justify-between gap-3'>
										<CardTitle className='font-display text-xl'>
											{alt.name}
										</CardTitle>
										<Avatar className='h-9 w-9 border border-border/70 bg-muted/60'>
											{favicon && (
												<AvatarImage
													src={favicon}
													alt={`${alt.name} logo`}
													className='object-contain p-1'
												/>
											)}
											<AvatarFallback className='text-xs font-semibold uppercase tracking-wide'>
												{initials}
											</AvatarFallback>
										</Avatar>
									</div>
									<CardDescription className='text-sm leading-relaxed'>
										{alt.description}
									</CardDescription>

									<div className='mt-3 flex flex-wrap gap-2 text-xs'>
										<Tooltip>
											<TooltipTrigger asChild>
												<div
													className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${getMobileClasses(
														alt.mobileSupport
													)}`}
												>
													<Smartphone className='h-3.5 w-3.5' />
													<span className='font-medium'>Mobile</span>
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>{alt.mobileNote ?? 'Mobile support status is unclear.'}</p>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<div
													className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${getNsfwClasses(
														alt.nsfwPolicy
													)}`}
												>
													<EyeOff className='h-3.5 w-3.5' />
													<span className='font-medium'>NSFW</span>
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{alt.nsfwNote ??
														'NSFW policy is not clearly documented; always read the latest rules.'}
												</p>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<div className='inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 px-2 py-1 text-muted-foreground'>
													<Globe2 className='h-3.5 w-3.5' />
													<span className='font-medium'>
														{alt.originFlag ? `${alt.originFlag} ` : ''}
														{alt.originLabel ?? 'Origin'}
													</span>
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{alt.originNote ??
														'Country or legal origin of the main org; self-hosting can change this.'}
												</p>
											</TooltipContent>
										</Tooltip>
									</div>
								</CardHeader>

								<CardContent className='flex-1 space-y-4'>
									{renderFeatureRow(alt)}

									<div className='rounded-lg bg-muted/40 p-3'>
										<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
											Pros
										</h4>
										<ul className='space-y-1.5'>
											{alt.pros.map((pro, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm text-muted-foreground'
												>
													<Check className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400' />
													<span>{pro}</span>
												</li>
											))}
										</ul>
									</div>

									{alt.warnings && alt.warnings.length > 0 && (
										<div className='mt-3 flex gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 text-xs text-amber-100'>
											<AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-amber-300' />
											<ul className='space-y-1'>
												{alt.warnings.map((warning, i) => (
													<li key={i}>{warning}</li>
												))}
											</ul>
										</div>
									)}

									<div className='rounded-lg bg-muted/40 p-3'>
										<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
											Cons
										</h4>
										<ul className='space-y-1.5'>
											{alt.cons.map((con, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm text-muted-foreground'
												>
													<AlertTriangle className='mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400' />
													<span>{con}</span>
												</li>
											))}
										</ul>
									</div>
								</CardContent>

								<CardFooter>
									<Button
										asChild
										variant='outline'
										className='w-full gap-2 border-border hover:border-primary hover:text-primary'
									>
										<a
											href={alt.url}
											target='_blank'
											rel='noopener noreferrer'
										>
											Visit {alt.name} <ExternalLink className='h-4 w-4' />
										</a>
									</Button>
								</CardFooter>
							</Card>
						);
					})}
				</div>

				<div className='mt-16 space-y-6 rounded-2xl border border-dashed border-border/70 bg-muted/40 p-6 sm:p-8'>
					<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
						<div>
							<h3 className='font-display text-2xl font-semibold'>
								Other, less popular alternatives
							</h3>
							<p className='mt-2 max-w-2xl text-sm text-muted-foreground'>
								These projects don&apos;t get mentioned to me nearly as often,
								but they might still be a great fit depending on your needs.
							</p>
						</div>
					</div>

					<div className='grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-3'>
						{lessPopularAlternatives.map((alt) => {
							const initials = alt.name
								.split(' ')
								.map((word) => word[0])
								.join('')
								.slice(0, 2)
								.toUpperCase();

							const favicon = alt.faviconUrl;

							return (
								<Card
									key={alt.name}
									className='group flex flex-col border-border/60 bg-background/40 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5'
								>
									<CardHeader>
										<div className='flex items-center justify-between gap-3'>
											<CardTitle className='font-display text-xl'>
												{alt.name}
											</CardTitle>
											<Avatar className='h-9 w-9 border border-border/70 bg-muted/60'>
												{favicon && (
													<AvatarImage
														src={favicon}
														alt={`${alt.name} logo`}
														className='object-contain p-1'
													/>
												)}
												<AvatarFallback className='text-xs font-semibold uppercase tracking-wide'>
													{initials}
												</AvatarFallback>
											</Avatar>
										</div>
										<CardDescription className='text-sm leading-relaxed'>
											{alt.description}
										</CardDescription>

										<div className='mt-3 flex flex-wrap gap-2 text-xs'>
											<Tooltip>
												<TooltipTrigger asChild>
													<div
														className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${getMobileClasses(
															alt.mobileSupport
														)}`}
													>
														<Smartphone className='h-3.5 w-3.5' />
														<span className='font-medium'>Mobile</span>
													</div>
												</TooltipTrigger>
												<TooltipContent>
													<p>
														{alt.mobileNote ?? 'Mobile support status is unclear.'}
													</p>
												</TooltipContent>
											</Tooltip>

											<Tooltip>
												<TooltipTrigger asChild>
													<div
														className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${getNsfwClasses(
															alt.nsfwPolicy
														)}`}
													>
														<EyeOff className='h-3.5 w-3.5' />
														<span className='font-medium'>NSFW</span>
													</div>
												</TooltipTrigger>
												<TooltipContent>
													<p>
														{alt.nsfwNote ??
															'NSFW policy is not clearly documented; always read the latest rules.'}
													</p>
												</TooltipContent>
											</Tooltip>

											<Tooltip>
												<TooltipTrigger asChild>
													<div className='inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 px-2 py-1 text-muted-foreground'>
														<Globe2 className='h-3.5 w-3.5' />
														<span className='font-medium'>
															{alt.originFlag ? `${alt.originFlag} ` : ''}
															{alt.originLabel ?? 'Origin'}
														</span>
													</div>
												</TooltipTrigger>
												<TooltipContent>
													<p>
														{alt.originNote ??
															'Country or legal origin of the main org; self-hosting can change this.'}
													</p>
												</TooltipContent>
											</Tooltip>
										</div>
									</CardHeader>

									<CardContent className='flex-1 space-y-4'>
										{renderFeatureRow(alt)}

										<div className='rounded-lg bg-muted/40 p-3'>
											<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
												Pros
											</h4>
											<ul className='space-y-1.5'>
												{alt.pros.map((pro, i) => (
													<li
														key={i}
														className='flex items-start gap-2 text-sm text-muted-foreground'
													>
														<Check className='mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400' />
														<span>{pro}</span>
													</li>
												))}
											</ul>
										</div>

										<div className='rounded-lg bg-muted/40 p-3'>
											<h4 className='mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
												Cons
											</h4>
											<ul className='space-y-1.5'>
												{alt.cons.map((con, i) => (
													<li
														key={i}
														className='flex items-start gap-2 text-sm text-muted-foreground'
													>
														<AlertTriangle className='mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400' />
														<span>{con}</span>
													</li>
												))}
											</ul>
										</div>

										{alt.warnings && alt.warnings.length > 0 && (
											<div className='mt-3 flex gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 text-xs text-amber-100'>
												<AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-amber-300' />
												<ul className='space-y-1'>
													{alt.warnings.map((warning, i) => (
														<li key={i}>{warning}</li>
													))}
												</ul>
											</div>
										)}
									</CardContent>

									<CardFooter>
										<Button
											asChild
											variant='outline'
											className='w-full gap-2 border-border hover:border-primary hover:text-primary'
										>
											<a
												href={alt.url}
												target='_blank'
												rel='noopener noreferrer'
											>
												Visit {alt.name} <ExternalLink className='h-4 w-4' />
											</a>
										</Button>
									</CardFooter>
								</Card>
							);
						})}
					</div>

					<div className='mt-4 flex gap-3 rounded-lg bg-background/60 p-4 text-xs sm:text-sm text-muted-foreground'>
						<Info className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
						<p className='leading-relaxed'>
							Disclaimer: popularity here is unfortunately based only on my own
							experience of how often people mention these projects to me, not
							on any hard data analysis. If you can provide good usage or
							adoption data, I&apos;d be happy to revisit and update how things
							are categorized.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AlternativesSection;
