<?php

/**
 * @ORM\Column(type="integer", nullable=true)
 */
private $nOrder;

public function getNOrder(): ?int
{
    return $this->nOrder;
}

public function setNOrder(?int $nOrder): self
{
    $this->nOrder = $nOrder;

    return $this;
}